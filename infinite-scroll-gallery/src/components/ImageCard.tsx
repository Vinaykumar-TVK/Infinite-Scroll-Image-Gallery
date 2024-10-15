"use client";
import { Photo } from "../lib/type";
import React from "react";

type Props = {
  photo: Photo;
};

export default function ImageCard({ photo }: Props) {
  return (
    <img
      className="w-full h-auto object-cover"
      src={photo.urls.regular}
      alt="img"
    />
  );
}
