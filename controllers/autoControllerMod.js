const Auto=require('../models/autoModellMod');

const autoController={
    async osszes(req, res) {
        try {
            const autos =  await Auto.osszes();
            res.status(200).json(autos);
        } catch (error) {
            console.error("Error fetching all cars:", error);
            res.status(500).json({ message: error.message });
        }
    },
    async egy(req, res) {
        try {
            const id = req.params.id;
            const auto = await Auto.egy(id);
            if (auto) {
                res.status(200).json(auto);
            } else {
                res.status(404).json({ message: 'Auto not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async hozzaad(req, res) {
        try {
            const autoData = req.body;
            const ujAuto = await Auto.hoozzaad(autoData);
            res.status(201).json(ujAuto);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async modosit(req, res) {
        try {
            const id = req.params.id;
            const autoData = req.body;
            const frissitettAuto = await Auto.modosit(id, autoData);
            res.status(200).json(frissitettAuto);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async torol(req, res) {
        try {
            const id = req.params.id;
            await Auto.torol(id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async szinkeres(req,res){
        try {
            const szin_id=req.params.szin_id;
            const autos=await Auto.szinkeres(szin_id);
            res.status(200).json(autos);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },

    async getMarka(req, res) {
        try {
            const autos =  await Auto.getMarka();
            res.status(200).json(autos);
        } catch (error) {
            console.error("Error fetching all cars:", error);
            res.status(500).json({ message: error.message });
        }
    },
    async getSzin(req, res) {
        try {
            const autos =  await Auto.getSzin();
            res.status(200).json(autos);
        } catch (error) {
            console.error("Error fetching all cars:", error);
            res.status(500).json({ message: error.message });
        }
    },
    async getUzemanyag(req, res) {
        try {
            const autos =  await Auto.getUzemanyag();
            res.status(200).json(autos);
        } catch (error) {
            console.error("Error fetching all cars:", error);
            res.status(500).json({ message: error.message });
        }
    },

};
module.exports=autoController;