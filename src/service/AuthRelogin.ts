import { Packet, ReqRelogin } from "@/proto/Proto";
import { WS } from "@/socket/WS";

const Relogin = async () => {
    // WS.me().connect();
    
     let token = sessionStorage.getItem('auth-token') || '';
     const user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
     const userName = user?.username || '';
     console.log('tokenRelogin', token);
        console.log('usernameRelogin', userName);
      if (!token && !userName) {
        return false;
      }
      else{
        let reLogin = ReqRelogin.create();
        reLogin.token = token;
        reLogin.username = userName;
        let packet = Packet.create();
        packet.data = { oneofKind: 'reqRelogin', reqRelogin: reLogin };
        console.log(packet);
        console.log('sent relogin');
        WS.send(packet);
        sessionStorage.setItem('relogin', 'true');
        console.log('da gui 1 message relogin');
      }
  };
  export default Relogin;