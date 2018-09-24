package modelo;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sensor_pecera_pescado")
public class sensor_pecera_pescado implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="sepe_id", nullable=false, unique=true)
	private long id;
	@Column(name="pece_id", nullable=false)
	private long id_pecera;
	@Column(name="sens_id", nullable=false)
	private long id_sensor;
	@Column(name="sepe_fecha", length=15, nullable=false)
	private Date fecha;
	@Column(name="sepe_hora", length=15, nullable=false)
	private String hora;
	@Column(name="sepe_valor", nullable=false)
	private double valor;
	@Column(name="sepe_incidencia", length=2, nullable=false)
	private String incidencia;
	
	public sensor_pecera_pescado() {
		
	}
	public sensor_pecera_pescado(long id, long id_pecera, long id_sensor, Date fecha, String hora, double valor,
			String incidencia) {
		super();
		this.id = id;
		this.id_pecera = id_pecera;
		this.id_sensor = id_sensor;
		this.fecha = fecha;
		this.hora = hora;
		this.valor = valor;
		this.incidencia = incidencia;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public long getId_sensor() {
		return id_sensor;
	}
	public void setId_sensor(long id_sensor) {
		this.id_sensor = id_sensor;
	}
	
	public String getHora() {
		return hora;
	}
	public void setHora(String hora) {
		this.hora = hora;
	}
	public double getValor() {
		return valor;
	}
	public void setValor(double valor) {
		this.valor = valor;
	}
	public String getIncidencia() {
		return incidencia;
	}
	public void setIncidencia(String incidencia) {
		this.incidencia = incidencia;
	}
	
}
