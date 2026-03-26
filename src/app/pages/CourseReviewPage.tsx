import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CourseReviewPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const course = {
    title: "Data Structures & Algorithms",
    tutor: "Raka Pratama",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log({ rating, review });
    navigate(`/class/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-[#F3F8FA]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to={`/class/${courseId}`}>
          <Button variant="ghost" className="text-[#476074] hover:bg-[#308279]/10 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Class
          </Button>
        </Link>

        <Card className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0A1B45] mb-3">
              Write a Review
            </h1>
            <p className="text-lg text-[#476074]">
              Share your experience with <span className="font-semibold text-[#308279]">{course.title}</span>
            </p>
            <p className="text-sm text-[#476074] mt-1">
              by {course.tutor}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-[#0A1B45]">
                How would you rate this class?
              </Label>
              <div className="flex flex-col items-center gap-4 p-8 bg-[#F3F8FA] rounded-lg">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-12 h-12 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-[#308279] text-[#308279]"
                            : "text-[#92B7B0]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#308279]">
                      {rating === 5 && "Excellent! ⭐"}
                      {rating === 4 && "Great! 👍"}
                      {rating === 3 && "Good 👌"}
                      {rating === 2 && "Fair 😐"}
                      {rating === 1 && "Poor 😞"}
                    </p>
                    <p className="text-sm text-[#476074] mt-1">
                      You rated this class {rating} out of 5 stars
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Review Text Section */}
            <div className="space-y-4">
              <Label htmlFor="review" className="text-lg font-semibold text-[#0A1B45]">
                Share your thoughts about the class
              </Label>
              <Textarea
                id="review"
                placeholder="Tell us what you liked or didn't like about this class. How was the content? Was the tutor helpful? Would you recommend it to others?"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-[200px] border-[#92B7B0]/30 focus:border-[#308279] text-base"
                required
              />
              <p className="text-sm text-[#476074]">
                {review.length} / 500 characters
              </p>
            </div>

            {/* Guidelines */}
            <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <h3 className="font-semibold text-[#0A1B45] mb-3">Review Guidelines</h3>
              <ul className="space-y-2 text-sm text-[#476074]">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Be honest and constructive with your feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Focus on the class content, teaching quality, and overall experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Avoid personal attacks or offensive language</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Your review will help other students make informed decisions</span>
                </li>
              </ul>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                disabled={rating === 0 || review.trim().length < 10}
                className="flex-1 bg-[#308279] hover:bg-[#308279]/90 text-white h-12 text-lg disabled:opacity-50"
              >
                Submit Review
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/class/${courseId}`)}
                className="flex-1 border-[#476074] text-[#476074] hover:bg-[#476074]/10 h-12 text-lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        {/* Tips Card */}
        <Card className="p-6 mt-6 bg-gradient-to-br from-[#308279]/5 to-[#92B7B0]/5 border-[#308279]/20">
          <h3 className="font-semibold text-[#0A1B45] mb-3">💡 Tips for writing a great review:</h3>
          <ul className="space-y-2 text-sm text-[#476074]">
            <li>✓ Mention specific topics or sessions that you found helpful</li>
            <li>✓ Describe how the class helped you achieve your goals</li>
            <li>✓ Comment on the tutor's teaching style and responsiveness</li>
            <li>✓ Share any suggestions for improvement</li>
          </ul>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
