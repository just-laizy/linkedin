import React from "react";

// Define types for Avatar props
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "small" | "medium" | "large";
}

// Main Avatar Component
export function Avatar({ src, alt = "Avatar", size = "medium" }: AvatarProps) {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return src ? (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${sizes[size]} rounded-full`}
    />
  ) : (
    <div
      className={`flex items-center justify-center ${sizes[size]} bg-gray-400 text-white font-medium rounded-full`}
    >
      {alt[0].toUpperCase()}
    </div>
  );
}

// AvatarFallback component
interface AvatarFallbackProps {
  fallbackText?: string;
  size?: "small" | "medium" | "large";
}

export function AvatarFallback({
  fallbackText = "?",
  size = "medium",
}: AvatarFallbackProps) {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div
      className={`flex items-center justify-center ${sizes[size]} bg-gray-400 text-white font-medium rounded-full`}
    >
      {fallbackText}
    </div>
  );
}

// AvatarImage Component
interface AvatarImageProps {
  src: string;
  alt?: string;
  size?: "small" | "medium" | "large";
}

export function AvatarImage({ src, alt = "User Avatar", size = "medium" }: AvatarImageProps) {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${sizes[size]} rounded-full`}
    />
  );
}
