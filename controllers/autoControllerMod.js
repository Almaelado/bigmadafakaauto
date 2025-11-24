const jwt = require('jsonwebtoken');

const Auto=require('../models/autoModellMod');

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_SECRET, { expiresIn: '15m' }); 
}

function generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_SECRET, { expiresIn: '7d' }); 
}

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
    async  szuro(req, res, next) {
    if (Object.keys(req.query).length > 0) {
        try {
            const szuro_json = {
                markak:["Mahindra","Hyundai"],
                uzemanyag:["Diesel","Petrol"],
                szin:["zöld","sárga"],
                arRange:[3100000,17300000],
                kmRange:[100000,350000],
                evjarat:[1930,1988],
                irat:true,
                valto:["Manuális"],
                motormeret:["1.2"], // mindig egy elem
                ajto:["4"],
                szemely:["2"]
            };

            let whereClauses = [];
            let values = [];

            // Többi IN mező (kivéve motormeret)
            const inFields = ["nev", "üzemanyag", "szin_nev", "váltó", "ajtó", "szemelyek"];
            inFields.forEach(field => {
                if (szuro_json[field] && szuro_json[field].length > 0) {
                    whereClauses.push(`${field} IN (${szuro_json[field].map(() => '?').join(',')})`);
                    values.push(...szuro_json[field]);
                }
            });

            // Range mezők -> BETWEEN
            const rangeFields = { arRange: "ar", kmRange: "km", evjarat: "kiadasiev" };
            for (const key in rangeFields) {
                if (szuro_json[key] && szuro_json[key].length === 2) {
                    whereClauses.push(`${rangeFields[key]} BETWEEN ? AND ?`);
                    values.push(szuro_json[key][0], szuro_json[key][1]);
                }
            }

            // Boolean mező
            if (typeof szuro_json.irat === "boolean") {
                whereClauses.push(`irat = ?`);
                values.push(szuro_json.irat ? 1 : 0);
            }

            // motormeret -> mindig >=
            if (szuro_json.motormeret && szuro_json.motormeret.length === 1) {
                whereClauses.push(`motormeret >= ?`);
                values.push(szuro_json.motormeret[0]);
            }

            // SQL összeállítása
            let sql = "SELECT * FROM osszes_auto";
            if (whereClauses.length > 0) {
                sql += " WHERE " + whereClauses.join(" AND ");
            }

            const [results] = await Auto.szuro(sql, values);
            res.status(200).json({ message: "Szűrés sikeres", results });
        } catch (error) {
            console.error("Error in filtering:", error);
            res.status(500).json({ message: error.message });
        }
    } else {
        console.log("Nincs query");
        try {
            const autos = await Auto.osszes();
            res.status(200).json(autos);
        } catch (error) {
            console.error("Error fetching all cars:", error);
            res.status(500).json({ message: error.message });
        }
    }
},

    async login (req, res,next){   
        const { username, password } = req.body;    
        /*
        const user = await authModel.validatePassword(username,password);
        console.log('Bejelentkezési kísérlet:', user);
        if (user!= false){
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
        res.cookie('refreshToken', refreshToken, 
            { httpOnly: true, 
              secure: false, // true ha HTTPS-t használsz
              sameSite: 'Lax', // Strict, Lax, None
              maxAge: 7*24*60*60*1000 // 7 nap
            });
        res.json({ accessToken });

        } else {
            res.status(401).send('Érvénytelen belépés');
        }*/
       if(username === 'admin' && password === 'password'){
            const user = { username: 'admin', role: 'admin' }; 
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.cookie('refreshToken', refreshToken, 
                { httpOnly: true, 
                  secure: false, // true ha HTTPS-t használsz
                  sameSite: 'Lax', // Strict, Lax, None
                  maxAge: 7*24*60*60*1000 // 7 nap
                });
            res.json({ accessToken });
        } else {
            res.status(401).send('Érvénytelen belépés');
        }

}
    
};
module.exports=autoController;