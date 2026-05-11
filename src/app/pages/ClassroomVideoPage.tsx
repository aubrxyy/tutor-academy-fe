import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { Clock, ListChecks, PlayCircle, Video } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { getMockClassroomData } from "../data/classroomContent";

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

export default function ClassroomVideoPage() {
  const { courseId, itemId } = useParams();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch") ?? `${courseId ?? "course"}-batch-a`;
  const { items } = getMockClassroomData(courseId, batchId);
  const item = items.find((entry) => entry.id === itemId && entry.kind === "video");
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Plyr | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setVideoError(false);
  }, [item?.sourceUrl]);

  useEffect(() => {
    const playerHost = playerHostRef.current;

    if (!playerHost || !item?.sourceUrl || videoError) {
      return;
    }

    const video = document.createElement("video");
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

    const handleVideoError = () => {
      playerRef.current?.destroy();
      playerRef.current = null;
      playerHost.replaceChildren();
      setVideoError(true);
    };

    video.addEventListener("error", handleVideoError);

    playerRef.current = new Plyr(video, {
      controls: VIDEO_CONTROLS,
      ratio: "16:9",
      settings: ["quality", "speed"],
    });

    return () => {
      video.removeEventListener("error", handleVideoError);
      playerRef.current?.destroy();
      playerRef.current = null;
      playerHost.replaceChildren();
    };
  }, [item?.sourceUrl, videoError]);

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
      <Card className="overflow-hidden rounded-[1.75rem] border-[#D8E5E9] bg-white shadow-[0_18px_42px_rgba(10,27,69,0.06)]">
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
            {item.sourceLabel ? (
              <span className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                {item.sourceLabel}
              </span>
            ) : null}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#476074]">{item.description}</p>
        </div>
      </Card>

  
    </div>
  );
}
