import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { AlertTriangle, Camera, Clock, Eye, EyeOff, PlayCircle } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Card } from "../../../components/ui/card";
import { getMockClassroomData } from "../../../data/classroomContent";

const VIDEO_CONTROLS = [
  "play-large",
  "play",
  "progress",
  "current-time",
  "duration",
  "mute",
  "volume",
  "settings",
  "pip",
  "fullscreen",
];

const GAZE_API_URL = import.meta.env.VITE_GAZE_API_URL ?? "http://127.0.0.1:8000/analyze-frame";
const FOCUS_SAMPLE_INTERVAL_MS = 350;
const TRACKER_FRAME_SIZE = 224;
const TRACKER_PREVIEW_SIZE = 180;

type GazeApiResponse = {
  focused: boolean;
  warning: boolean;
  reason: string | null;
  elapsedSeconds: number;
  faceCount: number;
  smoothedGaze: { x: number; y: number } | null;
  faceBox?: { x: number; y: number; width: number; height: number };
};

function getVideoMimeType(sourceUrl: string) {
  const extension = sourceUrl.split("?")[0]?.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "webm":
      return "video/webm";
    case "ogg":
    case "ogv":
      return "video/ogg";
    case "m3u8":
      return "application/x-mpegURL";
    case "mp4":
    default:
      return "video/mp4";
  }
}

function extractYouTubeVideoId(sourceUrl: string) {
  const trimmed = sourceUrl.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      const parts = url.pathname.split("/").filter(Boolean);
      const embedIndex = parts.findIndex((part) => part === "embed" || part === "shorts");
      if (embedIndex >= 0) {
        return parts[embedIndex + 1] ?? null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function drawFacePreview(
  sourceVideo: HTMLVideoElement,
  targetCanvas: HTMLCanvasElement,
  faceBox?: GazeApiResponse["faceBox"],
) {
  const context = targetCanvas.getContext("2d");
  if (!context) {
    return;
  }

  const sourceWidth = sourceVideo.videoWidth || 320;
  const sourceHeight = sourceVideo.videoHeight || 240;
  targetCanvas.width = TRACKER_PREVIEW_SIZE;
  targetCanvas.height = TRACKER_PREVIEW_SIZE;

  if (!faceBox) {
    const cropSize = Math.min(sourceWidth, sourceHeight);
    const cropX = (sourceWidth - cropSize) / 2;
    const cropY = (sourceHeight - cropSize) / 2;
    context.drawImage(
      sourceVideo,
      cropX,
      cropY,
      cropSize,
      cropSize,
      0,
      0,
      targetCanvas.width,
      targetCanvas.height,
    );
    return;
  }

  const padding = Math.max(faceBox.width, faceBox.height) * 0.7;
  const cropSize = Math.min(
    Math.max(faceBox.width, faceBox.height) + padding,
    sourceWidth,
    sourceHeight,
  );
  const cropX = Math.max(0, Math.min(faceBox.x + faceBox.width / 2 - cropSize / 2, sourceWidth - cropSize));
  const cropY = Math.max(0, Math.min(faceBox.y + faceBox.height / 2 - cropSize / 2, sourceHeight - cropSize));

  context.drawImage(
    sourceVideo,
    cropX,
    cropY,
    cropSize,
    cropSize,
    0,
    0,
    targetCanvas.width,
    targetCanvas.height,
  );
}

export default function ClassroomVideoPage() {
  const { courseId, itemId } = useParams();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { items } = getMockClassroomData(courseId, batchId);
  const item = items.find((entry) => entry.id === itemId && entry.kind === "video");
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Plyr | null>(null);
  const webcamVideoRef = useRef<HTMLVideoElement | null>(null);
  const webcamCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const facePreviewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const webcamStreamRef = useRef<MediaStream | null>(null);
  const isAnalyzingRef = useRef(false);
  const latestFaceBoxRef = useRef<GazeApiResponse["faceBox"]>();
  const [videoError, setVideoError] = useState(false);
  const [trackerEnabled, setTrackerEnabled] = useState(false);
  const [trackerError, setTrackerError] = useState<string | null>(null);
  const [focusStatus, setFocusStatus] = useState<GazeApiResponse | null>(null);

  useEffect(() => {
    setVideoError(false);
  }, [item?.sourceUrl]);

  useEffect(() => {
    const playerHost = playerHostRef.current;

    if (!playerHost || !item?.sourceUrl || videoError) {
      return;
    }

    const video = document.createElement("video");
    const youtubeVideoId = extractYouTubeVideoId(item.sourceUrl);

    let playerTarget: HTMLVideoElement | HTMLDivElement = video;

    if (youtubeVideoId) {
      const embed = document.createElement("div");
      embed.className = "h-full w-full";
      embed.dataset.plyrProvider = "youtube";
      embed.dataset.plyrEmbedId = youtubeVideoId;
      playerHost.replaceChildren(embed);
      playerTarget = embed;
    } else {
      video.className = "h-full w-full";
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";

      const source = document.createElement("source");
      source.src = item.sourceUrl;
      source.type = getVideoMimeType(item.sourceUrl);
      video.appendChild(source);
      video.append("Your browser does not support the video tag.");

      playerHost.replaceChildren(video);
    }

    const handleVideoError = () => {
      playerRef.current?.destroy();
      playerRef.current = null;
      playerHost.replaceChildren();
      setVideoError(true);
    };

    if (!youtubeVideoId) {
      video.addEventListener("error", handleVideoError);
    }

    playerRef.current = new Plyr(playerTarget, {
      controls: VIDEO_CONTROLS,
      ratio: "16:9",
      settings: ["quality", "speed"],
    });

    return () => {
      if (!youtubeVideoId) {
        video.removeEventListener("error", handleVideoError);
      }
      playerRef.current?.destroy();
      playerRef.current = null;
      playerHost.replaceChildren();
    };
  }, [item?.sourceUrl, videoError]);

  useEffect(() => {
    if (!trackerEnabled) {
      webcamStreamRef.current?.getTracks().forEach((track) => track.stop());
      webcamStreamRef.current = null;
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = null;
      }
      setFocusStatus(null);
      setTrackerError(null);
      return;
    }

    let cancelled = false;

    async function startWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 320 },
            height: { ideal: 320 },
            frameRate: { ideal: 24, max: 30 },
            facingMode: "user",
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        webcamStreamRef.current = stream;
        setTrackerError(null);

        if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = stream;
          await webcamVideoRef.current.play();
        }
      } catch {
        setTrackerError("Camera permission is required to start eye tracking.");
        setTrackerEnabled(false);
      }
    }

    startWebcam();

    return () => {
      cancelled = true;
      webcamStreamRef.current?.getTracks().forEach((track) => track.stop());
      webcamStreamRef.current = null;
    };
  }, [trackerEnabled]);

  useEffect(() => {
    if (!trackerEnabled) {
      latestFaceBoxRef.current = undefined;
      return;
    }

    let animationFrame = 0;

    const drawPreviewFrame = () => {
      const video = webcamVideoRef.current;
      const previewCanvas = facePreviewCanvasRef.current;

      if (video && previewCanvas && video.readyState >= 2) {
        drawFacePreview(video, previewCanvas, latestFaceBoxRef.current);
      }

      animationFrame = window.requestAnimationFrame(drawPreviewFrame);
    };

    animationFrame = window.requestAnimationFrame(drawPreviewFrame);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [trackerEnabled]);

  useEffect(() => {
    if (!trackerEnabled) {
      return;
    }

    const interval = window.setInterval(async () => {
      const video = webcamVideoRef.current;
      const canvas = webcamCanvasRef.current;

      if (!video || !canvas || video.readyState < 2 || isAnalyzingRef.current) {
        return;
      }

      isAnalyzingRef.current = true;

      try {
        canvas.width = TRACKER_FRAME_SIZE;
        canvas.height = TRACKER_FRAME_SIZE;

        const context = canvas.getContext("2d");
        if (!context) {
          return;
        }

        const sourceWidth = video.videoWidth || 320;
        const sourceHeight = video.videoHeight || 240;
        const cropSize = Math.min(sourceWidth, sourceHeight);
        const cropX = (sourceWidth - cropSize) / 2;
        const cropY = (sourceHeight - cropSize) / 2;

        context.drawImage(video, cropX, cropY, cropSize, cropSize, 0, 0, canvas.width, canvas.height);

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, "image/jpeg", 0.8);
        });

        if (!blob) {
          return;
        }

        const formData = new FormData();
        formData.append("file", blob, "webcam-frame.jpg");

        const response = await fetch(GAZE_API_URL, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Eye tracker service is unavailable.");
        }

        const data = (await response.json()) as GazeApiResponse;
        setFocusStatus(data);
        latestFaceBoxRef.current = data.faceBox;
        setTrackerError(null);
      } catch {
        latestFaceBoxRef.current = undefined;
        setTrackerError("Eye tracker service is offline. Start the Python gaze API on port 8000.");
      } finally {
        isAnalyzingRef.current = false;
      }
    }, FOCUS_SAMPLE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [trackerEnabled]);

  const focusPercentage = focusStatus?.warning ? 42 : focusStatus ? 92 : 0;
  const focusLabel = focusStatus?.warning ? "Tidak fokus" : focusStatus ? "Fokus" : "Standby";
  const trackerStatusText = trackerEnabled ? "Tracking" : "Off";
  const trackerTone = focusStatus?.warning ? "danger" : focusStatus?.reason ? "warning" : focusStatus ? "focused" : "idle";
  const trackerPanelClass =
    trackerTone === "danger"
      ? "border-red-300/80 bg-red-950/88 shadow-[0_18px_42px_rgba(220,38,38,0.28)]"
      : trackerTone === "warning"
        ? "border-yellow-300/80 bg-[#3A2F05]/88 shadow-[0_18px_42px_rgba(234,179,8,0.24)]"
        : trackerTone === "focused"
          ? "border-[#59D7C8]/80 bg-[#062F36]/88 shadow-[0_18px_42px_rgba(0,141,132,0.24)]"
          : "border-white/25 bg-[#071735]/88 shadow-[0_18px_42px_rgba(10,27,69,0.22)]";
  const trackerAccentClass =
    trackerTone === "danger"
      ? "bg-red-500 text-white"
      : trackerTone === "warning"
        ? "bg-yellow-400 text-[#0A1B45]"
        : "bg-[#008D84] text-white";
  const trackerIconClass =
    trackerTone === "danger"
      ? "bg-red-500/20 text-red-100"
      : trackerTone === "warning"
        ? "bg-yellow-400/20 text-yellow-100"
        : "bg-[#008D84]/25 text-[#9DE5DC]";
  const trackerLabelClass =
    trackerTone === "danger" ? "text-red-100" : trackerTone === "warning" ? "text-yellow-100" : "text-[#9DE5DC]";

  if (!item) {
    return (
      <Card className="rounded-[1.75rem] border-[#D8E5E9] bg-white p-10">
        <h2 className="text-2xl font-bold text-[#0A1B45]">Video not found</h2>
        <p className="mt-3 text-[#476074]">The selected video item is not available in this curriculum.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden rounded-[1.75rem] border-[#D8E5E9] bg-white shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
        <div className="aspect-video bg-[#071735] [--plyr-color-main:#308279]">
          {item.sourceUrl && !videoError ? (
            <div ref={playerHostRef} className="h-full w-full" />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#071735] via-[#0A1B45] to-[#308279]">
              <div className="text-center text-white">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <PlayCircle className="h-10 w-10" />
                </div>
                <div className="mt-4 text-lg font-semibold">Video unavailable</div>
                <div className="mt-1 text-sm text-white/75">
                  {item.sourceUrl ? "We could not load this lesson video." : "No video source has been attached yet."}
                </div>
              </div>
            </div>
          )}
        </div>

        {trackerEnabled ? (
          <div className={`absolute bottom-5 right-5 z-10 w-[156px] rounded-[1.25rem] border p-3 text-white backdrop-blur-md ${trackerPanelClass}`}>
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black">
              <video ref={webcamVideoRef} className="hidden" autoPlay muted playsInline />
              <canvas ref={facePreviewCanvasRef} className="aspect-square w-full scale-x-[-1] object-cover" />
              <div className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${trackerAccentClass}`}>
                {trackerStatusText}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <div>
                <div className="text-lg font-bold leading-none">{focusPercentage}%</div>
                <div className={`mt-1 text-xs font-semibold ${trackerLabelClass}`}>{focusLabel}</div>
              </div>
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${trackerIconClass}`}>
                {focusStatus?.warning ? <AlertTriangle className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </div>
            </div>
            {focusStatus?.reason ? <div className="mt-2 text-[11px] leading-4 text-white/75">{focusStatus.reason}</div> : null}
          </div>
        ) : null}

        <div className="p-7">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-0 bg-[#0A1B45]/8 text-[#0A1B45]">Video</Badge>
            <Badge className="border-0 bg-[#308279]/10 text-[#308279]">{item.sectionTitle}</Badge>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-[#0A1B45]">{item.title}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#476074]">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {item.meta}
            </span>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#476074]">{item.description}</p>
        </div>
      </Card>

      <Card className="rounded-[1.5rem] border-[#D8E5E9] bg-white p-5 shadow-[0_14px_32px_rgba(10,27,69,0.05)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-full ${trackerEnabled ? "bg-[#008D84] text-white" : "bg-[#F3F8FA] text-[#476074]"}`}>
              <Camera className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-bold text-[#0A1B45]">Webcam eye tracker</div>
              <div className="mt-1 text-sm text-[#476074]">
                {trackerEnabled ? "Checking focus while this lesson plays." : "Turn on the webcam demo to show student focus status."}
              </div>
              {trackerError ? <div className="mt-2 text-sm font-medium text-red-600">{trackerError}</div> : null}
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={trackerEnabled}
            aria-label={trackerEnabled ? "Turn off webcam eye tracker" : "Turn on webcam eye tracker"}
            className={`relative h-12 w-24 rounded-full border-2 p-1 transition-colors ${
              trackerEnabled
                ? "border-[#008D84] bg-[#008D84]"
                : "border-[#D8E5E9] bg-[#F3F8FA]"
            }`}
            onClick={() => setTrackerEnabled((enabled) => !enabled)}
          >
            <span
              className={`absolute top-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${
                trackerEnabled ? "translate-x-11 text-[#008D84]" : "translate-x-0 text-[#476074]"
              }`}
            >
              {trackerEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </span>
          </button>
        </div>
      </Card>

      <canvas ref={webcamCanvasRef} className="hidden" />
    </div>
  );
}
