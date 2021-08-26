package com.example.sistemaPCP;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.sistemaPCP.Service.impl.ActividadServiceImpl;
import com.example.sistemaPCP.Service.impl.RequerimientoServiceImpl;
import com.example.sistemaPCP.Service.impl.UnidadServiceImpl;
import com.example.sistemaPCP.model.Actividad;
import com.example.sistemaPCP.model.Requerimiento;
import com.example.sistemaPCP.model.Unidad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class SistemaPcpApplication {

	public static void main(String[] args) {
		// saveActividad();
		Map<String, ArrayList<String>> actividades = new HashMap<String, ArrayList<String>>();
		Map<String, ArrayList<String>> requerimientos = new HashMap<String, ArrayList<String>>();
		int year = Calendar.getInstance().get(Calendar.YEAR);
		ConfigurableApplicationContext context = SpringApplication.run(SistemaPcpApplication.class);
		ActividadServiceImpl repository = context.getBean(ActividadServiceImpl.class);
		RequerimientoServiceImpl repository2 = context.getBean(RequerimientoServiceImpl.class);
		UnidadServiceImpl repositorio3 = context.getBean(UnidadServiceImpl.class);
		List<Unidad> unidades = repositorio3.getAll();
		for(int j = 0; j < unidades.size() -1; j++){
			Long unidad = unidades.get(j).getId_unidad();
		
			String uri = "http://192.168.253.6:8080/api/poaactividad/GetActividadByUnidad/"+unidad+"/"+year;
			RestTemplate rest = new RestTemplate();
			String results = rest.getForObject(uri, String.class);
			try {
				JSONArray jsonarray = new JSONArray(results);
				for (int i = 0; i < jsonarray.length(); i++) {
					JSONObject jsonobject = jsonarray.getJSONObject(i);
					String id_actividad = jsonobject.getString("idactividad");
					String descripcion_acti = jsonobject.getString("actividad");
					String prec_total = jsonobject.getString("totalProyectado");
					String id_requerimiento = jsonobject.getString("idrequerimiento");
					String requerimiento = jsonobject.getString("requerimiento");
					if (actividades.get(id_actividad) == null) {
						ArrayList<String> actividad = new ArrayList<String>();
						actividad.add(descripcion_acti);
						actividad.add(prec_total);
						actividades.put(id_actividad, actividad);
						// repository.save(new Actividad(Long.parseLong(id_actividad), descripcion_acti,
						// sum));
					} else {
						String montoActual = actividades.get(id_actividad).get(1);
						Float montoNuevo = Float.parseFloat(montoActual) + Float.parseFloat(prec_total);
						actividades.get(id_actividad).set(1, montoNuevo.toString());

					}
					ArrayList<String> datos_req = new ArrayList<String>();
					datos_req.add(requerimiento);
					datos_req.add(prec_total);
					datos_req.add(id_actividad);
					requerimientos.put(id_requerimiento,datos_req);
					

				}

			} catch (JSONException err) {
				System.out.println("Exception : " + err.toString());
			}
		}
		for (Map.Entry<String, ArrayList<String>> entry : actividades.entrySet()) {
			String key = entry.getKey();
			String val = entry.getValue().get(1);
			String val2 = entry.getValue().get(0).toString();
			// System.out.println(key + "$" + val);
			repository.save(new Actividad(Long.parseLong(key), val2, Float.parseFloat(val)));
		}

		for (Map.Entry<String, ArrayList<String>> reque : requerimientos.entrySet()){
			String clave = reque.getKey();
			String precioTotal = reque.getValue().get(1);
			String descripcion_req = reque.getValue().get(0).toString();

			String idActividad = reque.getValue().get(2);
			Float montoAct = Float.parseFloat(actividades.get(idActividad).get(1));
			String desc_acti = actividades.get(idActividad).get(0);
			Actividad actividad_r = new Actividad(Long.parseLong(idActividad), desc_acti, montoAct);
			
			// System.out.println(key + "$" + val);
			repository2.save(new Requerimiento(Long.parseLong(clave), descripcion_req,
						Float.parseFloat(precioTotal),actividad_r));
		}

		// repository.save(new Actividad((long) 12, "equipar Lapto", 12));

		// // findAll heredado de la interface CrudRepository
		// Iterable<Actividad> todos = repository.getAll();
		// System.out.println("Listar todos las actividades:");

	}

	// private static void saveActividad() {

	// String uri =
	// "http://192.168.253.6:8080/api/poaactividad/GetActividadByUnidad/37/2021";
	// RestTemplate rest = new RestTemplate();
	// String results = rest.getForObject(uri, String.class);

	// // System.out.println(results);
	// try {
	// JSONArray jsonarray = new JSONArray(results);
	// ArrayList<Actividad> act = new ArrayList<>();
	// String cont = "";
	// for (int i = 0; i < jsonarray.length(); i++) {
	// JSONObject jsonobject = jsonarray.getJSONObject(i);

	// String id_actividad = jsonobject.getString("idactividad");
	// String descripcion_acti = jsonobject.getString("actividad");
	// String prec_total = jsonobject.getString("totalProyectado");
	// if (cont != id_actividad) {
	// act.add(new Actividad(Long.parseLong(id_actividad), descripcion_acti,
	// Integer.parseInt(prec_total)));
	// cont = id_actividad;
	// }

	// System.out.println("OBJECT : " + id_actividad);
	// }
	// } catch (JSONException err) {
	// System.out.println("Exception : " + err.toString());
	// }
	// }

}
