
export const CLIENT_ID = "247648133780-o3i1t98acb58rp2fod3q39jg257ro46t.apps.googleusercontent.com";

export function initializeGoogleSignIn(callback) {
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  script.onload = () => {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: callback
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }
    );
  };
}

