package modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="rango")
public class rango implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="rang_id", nullable=false, unique=true)
	private long id;
	@Column(name="pesc_id", nullable=false)
	private long id_pescado;
	@Column(name="sens_id", nullable=false)
	private long id_sensor;
	@Column(name="rang_maximo", nullable=false)
	private double max;
	@Column(name="rango_minimo", nullable=false)
	private double min;
	
	public rango() {
	
	}
	
	public rango(long id, long id_pescado, long id_sensor, double max, double min) {
		this.id = id;
		this.id_pescado = id_pescado;
		this.id_sensor = id_sensor;
		this.max = max;
		this.min = min;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getId_pescado() {
		return id_pescado;
	}
	public void setId_pescado(long id_pescado) {
		this.id_pescado = id_pescado;
	}
	public long getId_sensor() {
		return id_sensor;
	}
	public void setId_sensor(long id_sensor) {
		this.id_sensor = id_sensor;
	}
	public double getMax() {
		return max;
	}
	public void setMax(double max) {
		this.max = max;
	}
	public double getMin() {
		return min;
	}
	public void setMin(double min) {
		this.min = min;
	}
	
	
}
