import React from "react";
import ProjectImage from "@/components/project/ProjectImage";

export default function ProjectImageWrapper({ src, alt, className, index }) {
  const isVideo = src && (src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov"));


  return (
    <div key={`image-${index}`} className="w-full" data-image-index={index}>
      {isVideo ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className={className}
        />
      ) : (
        <ProjectImage src={src} alt={alt} className={className} data-image-id={`image-${index}`} />
      )}
    </div>
  );
}