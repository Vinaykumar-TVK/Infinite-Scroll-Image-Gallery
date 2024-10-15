import React, { useRef, useEffect, useState } from 'react';
import { useInfiniteQuery } from "@tanstack/react-query";
import { Photo } from "./lib/type";
import { fetchImages } from "./lib/server";
import Loading from "./components/Loading";
import ImageCard from "./components/ImageCard";
import './App.css'; 

interface PhotoType {
  total: number;
  total_pages: number;
  results: Photo[];
}

export default function App() {
  const sentinelRef = useRef(null);
  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery<
    PhotoType,
    Error
  >({
    queryKey: ["images"],
    queryFn: ({ pageParam = 1 }) => fetchImages(pageParam as number),
    getNextPageParam: (lastPage: PhotoType, allPages: PhotoType[]) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  // State to handle modal popup for image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        fetchNextPage();
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  const photos = data?.pages.flatMap((page: { results: Photo[] }) => page.results);

  // Function to open the modal with selected image
  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container">
      <nav>
        <h2 className="text-transparent bg-clip-text font-bold text-3xl whitespace-nowrap">
          Image Gallery
        </h2>
      </nav>
      {isLoading && (
        <div className="loading">
          <Loading />
        </div>
      )}

      {!isLoading && photos && photos.length < 1 ? (
        <p className="mx-auto text-center text-gray-400 text-sm">No images found</p>
      ) : (
        <main className="grid">
          {photos?.map((photo: Photo, i: number) => (
            <div
              key={i}
              className="image-card"
              onClick={() => openModal(photo.urls.regular)} // Open modal on click
            >
              <ImageCard photo={photo} />
            </div>
          ))}
        </main>
      )}

      {hasNextPage && (
        <div ref={sentinelRef} className="loading">
          <Loading />
        </div>
      )}

      {/* Modal Popup */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={selectedImage} alt="Selected" />
            <button className="close-button" onClick={closeModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
