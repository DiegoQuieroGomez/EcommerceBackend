const db = admin.firestore()

class ContenedorCarritosFb {
    constructor(carritos) {
        this.carritos = db.collection(carritos)
    }
    
    async crear(){

        
        try {
              const id = req.body
              const useJson = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
              };
              const usersDb = db.collection('users'); 
              const response = await usersDb.doc(id).set(userJson);
              res.send(response);
        } catch(error) {
              res.send(error);
        }
        
    }
}


