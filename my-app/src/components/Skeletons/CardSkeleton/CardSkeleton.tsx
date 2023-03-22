import React from "react"
import ContentLoader from "react-content-loader"

const CardSkeleton: React.FC = (): any => (
  <ContentLoader 
    speed={2}
    width={400}
    height={620}
    viewBox="0 0 400 620"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="0" ry="0" width="394" height="345" /> 
    <rect x="0" y="363" rx="0" ry="0" width="80" height="25" /> 
    <rect x="0" y="404" rx="0" ry="0" width="346" height="60" /> 
    <rect x="0" y="476" rx="0" ry="0" width="346" height="25" /> 
    <rect x="0" y="510" rx="0" ry="0" width="346" height="25" /> 
    <rect x="0" y="546" rx="0" ry="0" width="346" height="25" /> 
    <rect x="0" y="585" rx="0" ry="0" width="55" height="30" />
  </ContentLoader>
)

export default CardSkeleton;