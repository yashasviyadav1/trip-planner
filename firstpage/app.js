function app() {
  return (
    <>
      <div class="header-top">
        <div class="container">

          <a href="#" class="logo">
            <h1>Safar Suhana</h1>
          </a>

          <div class="header-btn-group">

            <button class="search-btn" aria-label="Search">
              <ion-icon name="search"></ion-icon>
            </button>

            <button class="nav-open-btn" aria-label="Open Menu" data-nav-open-btn>
              <ion-icon name="menu-outline"></ion-icon>
            </button>

          </div>

        </div>
      </div>



      <section class="hero" id="home">
        <div class="container">

          <h2 class="h1 hero-title">Journey to explore world</h2>

          <p class="hero-text">
            Your perfect trip diary to make your safar suhana 😇
          </p>

          <div class="btn-group">
            <button onclick="transferToSignInPage()" class="btn btn-primary">Sign in</button>

            <button onclick="transferToSignUpPage()" class="btn btn-secondary">Sign Up</button>
          </div>

        </div>
      </section>
    </>
  );
}
