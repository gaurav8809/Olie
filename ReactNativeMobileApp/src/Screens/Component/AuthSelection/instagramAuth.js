import React, {Component} from 'react';
import InstagramLogin from 'react-native-instagram-login';
import axios from 'axios';
class InstagramAuth extends Component {
  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ): void {
    if (
      prevProps.instaClick !== this.props.instaClick &&
      this.props.instaClick === true
    ) {
      this.instagramLogin.show();
    }
  }

  render() {
    return (
      <InstagramLogin
        ref={(ref) => (this.instagramLogin = ref)}
        appId="315548266413402"
        redirectUrl="https://socialsizzle.heroku.com/auth/"
        appSecret="8ec9685590edf9a6c9d97c3f6dc890f8"
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={async (data) => {
          await axios
            .get(
              'https://graph.instagram.com/me?fields=id,username&access_token=' +
                data.access_token,
            )
            .then((response) => {
              response.json();
              console.log(response);
            })
            .catch((error) => {
              //Error
              console.error(error);
            });
        }}
        onLoginFailure={(data) => console.log(data)}
      />
    );
  }
}
export {InstagramAuth};
