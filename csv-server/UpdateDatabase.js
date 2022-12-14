const { Connection } = require("./postgres");

const NegociosJSON = require("./output/denue_cdmx_Preproceso.json");
// const DelitosViolentosJSON = require("./output/Delitos_Violentos_Preproceso.json");

Connection.open();

if(Connection.db){
    Connection.db.query("DELETE from public.negocios");
    
    NegociosJSON.map( (negocio, index)=>{
        // console.log(negocio)
        // console.log(`INSERT INTO public.negocios ("id","nom_estab", "codigo_act", "nombre_act", "nomb_asent", "municipio", "latitud", "longitud","categoria") VALUES(${index}, '${negocio.nom_estab}','${negocio.codigo_act}','${negocio.nombre_act}', '${negocio.nomb_asent}', '${negocio.municipio}', '${negocio.latitud}', '${negocio.longitud}', '${negocio.categoria}');`)
        Connection.db.query(`INSERT INTO public.negocios ("id","nom_estab", "codigo_act", "nombre_act", "nomb_asent", "municipio", "latitud", "longitud","categoria") VALUES(${index}, '${negocio.nom_estab.replace(/['"]+/g, '')}','${negocio.codigo_act}','${negocio.nombre_act}', '${negocio.nomb_asent}', '${negocio.municipio}', '${negocio.latitud}', '${negocio.longitud}', '${negocio.categoria}');`)
        .then((success)=>{
            console.log("Registro " + (index+1) + " se ha guardado exitosamente")
            return true;
        })
        .catch((error)=>{
            console.log(error)
            console.log("id: " + negocio.id)
            process.exit()
            return false;
        })
    })
}