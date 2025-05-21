const Footer = () => {
    return (
        <div className="pt-5">
            <div className="container mx-auto border-b border-b-white/50">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 px-4 py-10">
                    <h2>
                        Namensy AnimeVibe
                        <div className="text-muted-foreground">
                            <p className="mt-4">
                                Your ultimate destination for anime and manga
                                discovery, tracking, and discussion.
                            </p>
                        </div>
                    </h2>
                    <h2>
                        Navigation
                        <div className="text-muted-foreground">
                            <p className="mt-4 hover:text-white cursor-pointer">
                                Browse Popular
                            </p>
                            <p className="mt-1 hover:text-white cursor-pointer">
                                Browse News
                            </p>
                        </div>
                    </h2>
                    <h2>
                        Community
                        <div className="text-muted-foreground">
                            <p className="mt-4 hover:text-white cursor-pointer">
                                Join Discord
                            </p>
                            <p className="mt-1 hover:text-white cursor-pointer">
                                About Us
                            </p>
                            <p className="mt-1 hover:text-white cursor-pointer">
                                Contact
                            </p>
                            <p className="mt-1 hover:text-white cursor-pointer">
                                Feedback
                            </p>
                        </div>
                    </h2>
                    <h2>
                        Account
                        <div className="text-muted-foreground">
                            <p className="mt-4 hover:text-white cursor-pointer">
                                Create Account
                            </p>
                            <p className="mt-1 hover:text-white cursor-pointer">
                                Log in
                            </p>
                        </div>
                    </h2>
                </div>
            </div>
            <h3 className="text-center text-muted-foreground py-5">
                © 2025 Namensy AnimeVibe. All rights reserved.
            </h3>
            <div></div>
        </div>
    )
}

export default Footer
