import React from "react"
import ContentLoader from "react-content-loader"

const SmallCategoryCardSkeleton: React.FC = (): any => (
  <ContentLoader 
    speed={2}
    width={160}
    height={170}
    viewBox="0 0 160 170"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="160" height="120" /> 
    <rect x="523" y="23" rx="0" ry="0" width="492" height="50" /> 
    <rect x="524" y="106" rx="0" ry="0" width="492" height="70" /> 
    <rect x="526" y="318" rx="0" ry="0" width="200" height="57" /> 
    <rect x="10" y="125" rx="0" ry="0" width="140" height="18" />
  </ContentLoader>
)

export default SmallCategoryCardSkeleton;
