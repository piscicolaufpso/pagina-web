package modelo;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="solucion_persona")
public class solucion_persona implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="sope_id", nullable=false, unique=true)
	private long id;
	@Column(name="pers_id", nullable=false)
	private long id_persona;
	@Column(name="sepe_fecha", nullable=false)
	private long id_fecha;
	@Column(name="sope_fecha", nullable=false)
	private Date fecha;
	@Column(name="sope_hora", nullable=false)
	private Time hora;
	@Column(name="sope_nombre", length=200, nullable=false)
	private String nombre;
	@Column(name="sope_accion", length=5000, nullable=false)
	private String accion;
	@Column(name="sope_observacion", length=5000)
	private String observacion;
	
	public solucion_persona() {
		
	}
	public solucion_persona(long id, long id_persona, long id_fecha, Date fecha,
			Time hora, String nombre, String accion, String observacion) {
		this.id = id;
		this.id_persona = id_persona;
		this.id_fecha = id_fecha;
		this.fecha = fecha;
		this.hora = hora;
		this.nombre = nombre;
		this.accion = accion;
		this.observacion = observacion;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getId_persona() {
		return id_persona;
	}
	public void setId_persona(long id_persona) {
		this.id_persona = id_persona;
	}
	public long getId_fecha() {
		return id_fecha;
	}
	public void setId_fecha(long id_fecha) {
		this.id_fecha = id_fecha;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public Time getHora() {
		return hora;
	}
	public void setHora(Time hora) {
		this.hora = hora;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getAccion() {
		return accion;
	}
	public void setAccion(String accion) {
		this.accion = accion;
	}
	public String getObservacion() {
		return observacion;
	}
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}
	
}
