package modelo;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name="pescado_pecera")
public class pescado_pecera implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="pesp_id", nullable=false, unique=true)
	private long id;
	@Column(name="pesc_id", nullable=false)
	private long id_pescado;
	@Column(name="pece_id", nullable=false)
	private long id_pecera;
	@Column(name="pesp_cantidad", nullable=false)
	private int cantidad;
	@Column(name="pesp_fecha_inicio", nullable=false)
	@Type(type="date")
	private Date fecha_inicio;
	@Column(name="pesp_fecha_fin")
	@Type(type="date")
	private Date fecha_fin;
	
	public pescado_pecera() {
		
	}
	public pescado_pecera(long id, long id_pescado, long id_pecera, int cantidad, Date fecha_inicio,
			Date fecha_fin) {
		this.id = id;
		this.id_pescado = id_pescado;
		this.id_pecera = id_pecera;
		this.cantidad = cantidad;
		this.fecha_inicio = fecha_inicio;
		this.fecha_fin = fecha_fin;
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
	public long getId_pecera() {
		return id_pecera;
	}
	public void setId_pecera(long id_pecera) {
		this.id_pecera = id_pecera;
	}
	public int getCantidad() {
		return cantidad;
	}
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	public Date getFecha_inicio() {
		return fecha_inicio;
	}
	public void setFecha_inicio(Date fecha_inicio) {
		this.fecha_inicio = fecha_inicio;
	}
	public Date getFecha_fin() {
		return fecha_fin;
	}
	public void setFecha_fin(Date fecha_fin) {
		this.fecha_fin = fecha_fin;
	}

}
