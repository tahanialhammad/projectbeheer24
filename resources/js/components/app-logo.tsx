// import AppLogoIcon from './app-logo-icon';

// export default function AppLogo() {
//     return (
//         <>
//             <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
//                 <AppLogoIcon className="block h-12 bg-white w-auto fill-current text-gray-800" />

//             </div>
//             {/* <div className="ml-1 grid flex-1 text-left text-sm">
//                 <span className="mb-0.5 truncate leading-tight font-semibold">ProjectBeheer24</span>
//             </div> */}
//         </>
//     );
// }




import AppLogoIcon from './app-logo-icon';

type AppLogoProps = {
    showName?: boolean; // Optioneel: toont naam als true
    className?: string; // Extra styling als nodig
};

export default function AppLogo({ showName = false, className = '' }: AppLogoProps) {
    return (
        <div className={`flex items-center ${className}`}>
            {/* Logo icoon */}
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="block h-12 w-auto fill-current text-gray-800 bg-white" />
            </div>

            {/* Optioneel: projectnaam */}
            {showName && (
                <div className="ml-2 text-left text-sm">
                    <span className="font-semibold leading-tight text-gray-800">
                        ProjectBeheer24
                    </span>
                </div>
            )}
        </div>
    );
}
