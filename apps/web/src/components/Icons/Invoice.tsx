import * as React from "react";

function Invoice(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M7.27 19.323l-.895.594-3.125-2.084-3.125 2.084V.125h18.75v7.5A2.643 2.643 0 0016 8.198l-8.73 8.73v2.395zm2.084-1.531l6.396-6.386 2.115 2.125-6.386 6.386H9.354v-2.125zm8.886-8.136a.25.25 0 00-.084-.062.518.518 0 00-.646.041l-.02.021-1.021 1.021 2.125 2.125 1.02-1.02a.528.528 0 000-.75L18.24 9.655z"
                fill={props.fill || "#2E0052"}
            />
        </svg>
    );
}

const InvoiceIcon = React.memo(Invoice);
export default InvoiceIcon;
