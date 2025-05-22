const Footer = () => {
  return (
    <div className="pt-5">
      <div className="container mx-auto border-b border-b-white/50">
        <div className="grid grid-cols-2 gap-2 px-4 py-10 lg:grid-cols-4">
          <h2>
            Namensy AnimeVibe
            <div className="text-muted-foreground">
              <p className="mt-4">
                Your ultimate destination for anime and manga discovery,
                tracking, and discussion.
              </p>
            </div>
          </h2>
          <h2>
            Navigation
            <div className="text-muted-foreground">
              <p className="mt-4 cursor-pointer hover:text-white">
                Browse Popular
              </p>
              <p className="mt-1 cursor-pointer hover:text-white">
                Browse News
              </p>
            </div>
          </h2>
          <h2>
            Community
            <div className="text-muted-foreground">
              <p className="mt-4 cursor-pointer hover:text-white">
                Join Discord
              </p>
              <p className="mt-1 cursor-pointer hover:text-white">About Us</p>
              <p className="mt-1 cursor-pointer hover:text-white">Contact</p>
              <p className="mt-1 cursor-pointer hover:text-white">Feedback</p>
            </div>
          </h2>
          <h2>
            Account
            <div className="text-muted-foreground">
              <p className="mt-4 cursor-pointer hover:text-white">
                Create Account
              </p>
              <p className="mt-1 cursor-pointer hover:text-white">Log in</p>
            </div>
          </h2>
        </div>
      </div>
      <h3 className="text-muted-foreground py-5 text-center">
        © 2025 Namensy AnimeVibe. All rights reserved.
      </h3>
      <div></div>
    </div>
  )
}

export default Footer
