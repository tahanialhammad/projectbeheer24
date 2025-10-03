import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (        
        <div className="flex min-h-screen"> 
            {/* Links */}
            <div className="hidden lg:block w-1/2">
                <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Marketing image"
                className="w-full h-full object-cover"
                />
            </div>

            {/* Rechts */}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-10">
                <AuthLayoutTemplate title={title} description={description} {...props}>
                {children}
                </AuthLayoutTemplate>
            </div>
        </div>
    );
}
