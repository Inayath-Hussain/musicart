import * as React from "react";

function Star(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" {...props}>
            <path
                d="M8.583 1.441c.353-.882 1.602-.882 1.956 0l1.697 4.236c.146.364.482.617.872.656l4.392.446c.896.09 1.273 1.192.62 1.812l-3.421 3.249c-.264.25-.38.621-.306.978l.977 4.704c.19.914-.813 1.605-1.599 1.103l-3.643-2.326a1.054 1.054 0 00-1.134 0L5.35 18.625c-.786.502-1.789-.19-1.599-1.103l.978-4.704a1.054 1.054 0 00-.307-.978L1.002 8.59c-.653-.62-.277-1.722.62-1.812l4.391-.446c.39-.04.726-.292.872-.656L8.583 1.44z"
                fill={props.fill || "#FFD600"} stroke="#FFD600"
            />
        </svg>
    );
}

const StarIcon = React.memo(Star);
export default StarIcon;
