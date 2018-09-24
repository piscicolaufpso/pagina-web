package modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="indicador")
public class indicador implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="indi_id", nullable=false, unique=true)
	private long id;
	@Column(name="rang_id", nullable=false)
	private long id_rango;
	@Column(name="indi_maximo")
	private double max;
	@Column(name="indi_minimo")
	private double min;
	@Column(name="indi_recomendacion", length=5000, nullable=false)
	private String recomendacion;
	@Column(name="indi_activo", length=2, nullable=false)
	private String activo;
	
	public indicador() {
		
	}
	public indicador(long id, long id_rango, double max, double min, String recomendacion, String activo) {
		this.id = id;
		this.id_rango = id_rango;
		this.max = max;
		this.min = min;
		this.recomendacion = recomendacion;
		this.activo = activo;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getId_rango() {
		return id_rango;
	}
	public void setId_rango(long id_rango) {
		this.id_rango = id_rango;
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
	public String getRecomendacion() {
		return recomendacion;
	}
	public void setRecomendacion(String recomendacion) {
		this.recomendacion = recomendacion;
	}
	public String getActivo() {
		return activo;
	}
	public void setActivo(String activo) {
		this.activo = activo;
	}
	
}
