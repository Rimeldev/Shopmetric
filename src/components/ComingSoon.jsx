import React from "react";
import { Construction, Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * 🚧 COMING SOON COMPONENT
 * 
 * Display for pages under construction
 * 
 * @param {string} pageName - Name of the page
 * @param {string} description - Optional description
 */
export default function ComingSoon({ 
  pageName = "This Page", 
  description = "We're working hard to bring you this feature" 
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-2xl max-w-2xl w-full">
        <div className="card-body items-center text-center">
          
          {/* Icon */}
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-warning/10 rounded-full flex items-center justify-center">
              <Construction className="text-warning" size={64} />
            </div>
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Clock className="text-info" size={32} />
            </div>
          </div>

          {/* Title */}
          <h2 className="card-title text-3xl font-bold mb-2">
            {pageName}
          </h2>
          <div className="badge badge-warning badge-lg mb-4">Coming Soon</div>

          {/* Description */}
          <p className="text-base-content/60 text-lg mb-6 max-w-md">
            {description}
          </p>

          {/* Progress */}
          <div className="w-full max-w-md mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-base-content/60">Development Progress</span>
              <span className="font-bold text-warning">In Progress</span>
            </div>
            <progress className="progress progress-warning w-full" value="45" max="100"></progress>
          </div>

          {/* Features List */}
          <div className="alert alert-info mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm">This feature is currently under development and will be available soon!</span>
          </div>

          {/* Actions */}
          <div className="card-actions">
            <button 
              className="btn btn-primary gap-2"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}