import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export enum ContentSegmentTypes {
  REVIEWS = 'reviews',
  AWARDS = 'awards',
  NEWS = 'news',
  PRODUCTS = 'products',
  RATING = 'rating',
}

interface UseContentSegmentReturn {
  activeSegment: ContentSegmentTypes;
  setActiveSegment: (segment: ContentSegmentTypes) => void;
}

export const useContentSegment = (fallbackSegment: ContentSegmentTypes): UseContentSegmentReturn => {
  const segmentFromPath = getSegmentFromPath();
  const [activeSegment, setActiveSegment] = useState(segmentFromPath ?? fallbackSegment);
  useEffect(() => {
    setActiveSegment(segmentFromPath);
  }, [segmentFromPath]);

  return {
    activeSegment,
    setActiveSegment,
  };
};

const getSegmentFromPath = (): ContentSegmentTypes | null => {
  const segment = useRouter().asPath.split('#')[1];
  return segment && checkSegment(segment) ? (segment as ContentSegmentTypes) : null;
};

const checkSegment = (segment: string): boolean => Object.values(ContentSegmentTypes).some((v) => v === segment);
