import React from "react"
import ContentLoader from "react-content-loader"

const SmallOneProductCardSkeleton: React.FC = (): any => (
  <ContentLoader 
    speed={2}
    width={327}
    height={700}
    viewBox="0 0 327 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="398" rx="0" ry="0" width="327" height="75" /> 
    <rect x="27" y="569" rx="0" ry="0" width="285" height="58" /> 
    <rect x="0" y="528" rx="0" ry="0" width="100" height="31" /> 
    <rect x="0" y="0" rx="0" ry="0" width="327" height="331" /> 
    <rect x="523" y="23" rx="0" ry="0" width="492" height="50" /> 
    <rect x="524" y="106" rx="0" ry="0" width="492" height="70" /> 
    <rect x="526" y="318" rx="0" ry="0" width="200" height="57" /> 
    <rect x="0" y="351" rx="0" ry="0" width="327" height="31" /> 
    <rect x="27" y="638" rx="0" ry="0" width="285" height="58" />
  </ContentLoader>
)

export default SmallOneProductCardSkeleton;
