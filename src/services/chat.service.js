import axios from 'axios';
// import authHeader from './auth-header';

// const API_URL = `${process.env.DOMAIN}/api/tags/`;
import {apiEndpoint} from '../reecho-config'
import {chatEndpoint} from '../reecho-config'
import authHeader from './auth-header';
const querystring = require('querystring');


class ChatService {
  

    getAllChatGroups() {
        return axios.get(chatEndpoint + '/allChatGroups');
      }

      getAllChatGroupsMembers(room) {
        return axios.get(chatEndpoint + '/allChatGroupMembers?room='+room);
      }   


      getPrivateChat(sender, receipt) {
        return axios.get(chatEndpoint + '/privateChat?sender='+sender+'&receipt='+receipt);
      }  

      getPrivateChatLimit(sender, receipt, offset, limit) {
        return axios.get(chatEndpoint + '/privateChatLimit?sender='+sender+'&receipt='+receipt+'&offset='+offset+'&limit='+limit);
      }  
      
      getPrivateChatUnseen(receipt) {
        return axios.get(chatEndpoint + '/privateChatUnseen?receipt='+receipt);
      }


      updatePrivateChatSatus(sender, receipt, time) {
        return axios.put(chatEndpoint + '/updatePrivateChatSatus?sender='+sender+'&receipt='+receipt+'&time='+time);
      }


      updateGroupChatSatus(seenby, room, time) {
        return axios.put(chatEndpoint + '/updateGroupChatSatus?seenby='+seenby+'&room='+room+'&time='+time);
      }

      getPrivateChatLastMessage(sender, receipt) {
        return axios.get(chatEndpoint + '/privateChatLastMessage?sender='+sender+'&receipt='+receipt);
      }

      getGroupChatLastMessage(room) {
        return axios.get(chatEndpoint + '/groupChatLastMessage?room='+room);
      }
      
      getPrivateChatLastSeen(sender, receipt) {
        return axios.get(chatEndpoint + '/privateChatLastSeen?sender='+sender+'&receipt='+receipt);
      }

      getGroupChat(room) {
        return axios.get(chatEndpoint + '/chatGroupsMsg?room='+room);
      }  

      getGroupChatLimit(room, offset, limit) {
        return axios.get(chatEndpoint + '/chatGroupsMsgLimit?room='+room+'&offset='+offset+'&limit='+limit);
      }  

      getGroupChatUnseen(seenby, room) {
        return axios.get(chatEndpoint + '/groupChatUnseen?seenby='+seenby+'&room='+room);
      }

      getGroupChatLastSeen(seenby, room) {
        return axios.get(chatEndpoint + '/groupChatLastSeen?seenby='+seenby+'&room='+room);
      }


      updateUserChatStatus(user_id, status){
    
        return axios.put(chatEndpoint + '/updateUserChatStatus?id='+user_id+'&chatstatus='+status)
    
      }

      searchPrivateChatText(search, sender){
        return axios.get(chatEndpoint + '/privateChatSearch?search='+search+'&sender='+sender);
      }

      searchPrivateChatImages(sender, receipt){
        return axios.get(chatEndpoint + '/privateChatSearchImages?sender='+sender+'&receipt='+receipt);
      }

      searchPrivateChatFiles(sender, receipt){
        return axios.get(chatEndpoint + '/privateChatSearchFiles?sender='+sender+'&receipt='+receipt);
      }

      searchGroupChatText(search, sender){
        return axios.get(chatEndpoint + '/groupChatSearch?search='+search);
      }

      searchGroupChatImages(room){
        return axios.get(chatEndpoint + '/groupChatSearchImages?room='+room);
      }

      searchGroupChatFiles(room){
        return axios.get(chatEndpoint + '/groupChatSearchFiles?room='+room);
      }



  // ${localStorage.getItem('token')}`;

}

export default new ChatService();


// INSERT INTO employer_tag VALUES (3,'Deliveroo'),(4,'Dropbox'),(5,'eBay'),(6,'Facebook'),(7,'Funding Circle'),(8,'Google'),(9,'Groupon'),(10,'Intercom'),(11,'LinkedIn'),(12,'Microsoft'),(13,'Monzo'),(14,'N29'),(15,'Revolut'),(16,'Salesforce'),(17,'Skype'),(18,'Spotify'),(19,'Transferwise'),(20,'Uber'),(21,'Zendesk');
