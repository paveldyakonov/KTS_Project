import React from "react"
import ContentLoader from "react-content-loader"

const OneProductCardSkeleton: React.FC = (): any => (
  <ContentLoader 
    speed={2}
    width={1022}
    height={500}
    viewBox="0 0 1022 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="510" rx="0" ry="0" width="346" height="25" /> 
    <rect x="0" y="546" rx="0" ry="0" width="346" height="25" /> 
    <rect x="0" y="585" rx="0" ry="0" width="55" height="30" /> 
    <rect x="-1" y="0" rx="0" ry="0" width="500" height="500" /> 
    <rect x="523" y="23" rx="0" ry="0" width="492" height="50" /> 
    <rect x="524" y="106" rx="0" ry="0" width="492" height="70" /> 
    <rect x="526" y="318" rx="0" ry="0" width="200" height="57" /> 
    <rect x="526" y="406" rx="0" ry="0" width="225" height="56" /> 
    <rect x="780" y="404" rx="0" ry="0" width="225" height="56" />
  </ContentLoader>
)

export default OneProductCardSkeleton;
