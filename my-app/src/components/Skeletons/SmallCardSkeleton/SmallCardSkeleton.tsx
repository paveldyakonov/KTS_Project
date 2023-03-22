import React from "react"
import ContentLoader from "react-content-loader"

const SmallCardSkeleton: React.FC = (): any => (
  <ContentLoader 
    speed={2}
    width={170}
    height={330}
    viewBox="0 0 170 330"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="363" rx="0" ry="0" width="80" height="25" /> 
    <rect x="0" y="404" rx="0" ry="0" width="346" height="60" /> 
    <rect x="0" y="476" rx="0" ry="0" width="346" height="25" /> 
    <rect x="0" y="510" rx="0" ry="0" width="346" height="25" /> 
    <rect x="0" y="546" rx="0" ry="0" width="346" height="25" /> 
    <rect x="0" y="585" rx="0" ry="0" width="55" height="30" /> 
    <rect x="0" y="0" rx="0" ry="0" width="156" height="130" /> 
    <rect x="0" y="148" rx="0" ry="0" width="80" height="22" /> 
    <rect x="0" y="189" rx="0" ry="0" width="156" height="34" /> 
    <rect x="0" y="234" rx="0" ry="0" width="156" height="70" /> 
    <rect x="0" y="309" rx="0" ry="0" width="32" height="18" />
  </ContentLoader>
)

export default SmallCardSkeleton;