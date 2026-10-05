const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

exports.notifyNewCoupleMessage = onDocumentCreated('couples/{coupleId}/messages/{messageId}', async (event) => {
  const message = event.data?.data();
  if (!message?.senderId || !message?.text) return;
  const coupleId = event.params.coupleId;
  const couple = await db.doc(`couples/${coupleId}`).get();
  const members = Object.keys(couple.data()?.members || {}).filter(uid => uid !== message.senderId);
  if (!members.length) return;

  const tokens = [];
  for (const uid of members) {
    const snap = await db.doc(`users/${uid}`).get();
    const token = snap.data()?.expoPushToken;
    if (token) tokens.push(token);
  }
  if (!tokens.length) return;

  const messages = tokens.map(to => ({to, sound:'default', title:'💬 Mi Pareja', body:message.text.slice(0, 120), data:{coupleId}}));
  await fetch('https://exp.host/--/api/v2/push/send', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(messages)});
});
