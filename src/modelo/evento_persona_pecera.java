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
@Table(name="evento_persona_pecera")
public class evento_persona_pecera implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="evpe_id", nullable=false, unique=true)
	private long id;
	@Column(name="even_id", nullable=false)
	private long id_evento;
	@Column(name="pers_id", nullable=false)
	private long id_persona;
	@Column(name="pece_id", nullable=false)
	private long id_pecera;
	@Column(name="evpe_fecha", length=15, nullable=false)
	private Date fecha;
	@Column(name="evpe_hora", length=15, nullable=false)
	private Time hora;
	@Column(name="evpe_observacion", length=5000, nullable=false)
	private String observacion;
	
	public evento_persona_pecera() {
	
	}
	public evento_persona_pecera(long id, long id_evento, long id_persona, long id_pecera, Date fecha, Time hora,
			String observacion) {
		this.id = id;
		this.id_evento = id_evento;
		this.id_persona = id_persona;
		this.id_pecera = id_pecera;
		this.fecha = fecha;
		this.hora = hora;
		this.observacion = observacion;
	}


	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getId_evento() {
		return id_evento;
	}
	public void setId_evento(long id_evento) {
		this.id_evento = id_evento;
	}
	public long getId_persona() {
		return id_persona;
	}
	public void setId_persona(long id_persona) {
		this.id_persona = id_persona;
	}
	public long getId_pecera() {
		return id_pecera;
	}
	public void setId_pecera(long id_pecera) {
		this.id_pecera = id_pecera;
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
	public String getObservacion() {
		return observacion;
	}
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}
	
}
