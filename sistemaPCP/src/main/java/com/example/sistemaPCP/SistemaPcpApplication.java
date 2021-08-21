package com.example.sistemaPCP;

import java.util.ArrayList;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import com.example.sistemaPCP.Service.impl.ActividadServiceImpl;
import com.example.sistemaPCP.Service.impl.RequerimientoServiceImpl;
import com.example.sistemaPCP.model.Actividad;
import com.example.sistemaPCP.model.Requerimiento;

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
		Map<String,ArrayList<String>> actividades = new HashMap<String,ArrayList<String>>();
		ConfigurableApplicationContext context = SpringApplication.run(SistemaPcpApplication.class);
		ActividadServiceImpl repository = context.getBean(ActividadServiceImpl.class);
		RequerimientoServiceImpl repository2 = context.getBean(RequerimientoServiceImpl.class);
		String uri = "http://192.168.253.6:8080/api/poaactividad/GetActividadByUnidad/37/2021";
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
					actividades.put(id_actividad,actividad);
					//repository.save(new Actividad(Long.parseLong(id_actividad), descripcion_acti, sum));
				} else {
					String montoActual = actividades.get(id_actividad).get(1);
					Float montoNuevo = Float.parseFloat(montoActual) + Float.parseFloat(prec_total);
					actividades.get(id_actividad).set(1, montoNuevo.toString());
					

				}
				/*repository2.save(new Requerimiento(Long.parseLong(id_requerimiento), requerimiento,
						Float.parseFloat(jsonobject.getString("totalProyectado")),
						new Actividad(Long.parseLong(id_actividad), descripcion_acti, sum)));*/

			}

		} catch (JSONException err) {
			System.out.println("Exception : " + err.toString());
		}
		for (Map.Entry<String, ArrayList<String>> entry : actividades.entrySet()) {
			String key = entry.getKey();
			Object val = entry.getValue();
			System.out.println(key+val);
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

