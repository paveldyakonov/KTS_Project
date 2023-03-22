import React from "react"
import ContentLoader from "react-content-loader"

const CategoryCardSkeleton: React.FC = (): any => (
  <ContentLoader 
    speed={2}
    width={394}
    height={400}
    viewBox="0 0 394 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="394" height="345" /> 
    <rect x="523" y="23" rx="0" ry="0" width="492" height="50" /> 
    <rect x="524" y="106" rx="0" ry="0" width="492" height="70" /> 
    <rect x="526" y="318" rx="0" ry="0" width="200" height="57" /> 
    <rect x="63" y="361" rx="0" ry="0" width="260" height="34" />
  </ContentLoader>
)

export default CategoryCardSkeleton;
