package modelo;

import javax.persistence.Entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="persona_perfil")
public class persona_perfil implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="pepe_id", nullable=false, unique=true)
	private long id;
	@Column(name="perf_id", nullable=false)
	private long id_perfil;
	@Column(name="pers_id", nullable=false)
	private long id_persona;
	@Column(name="pepe_activo", length=2, nullable=false)
	private String activo;
	
	
	public persona_perfil() {
	
	}
	public persona_perfil(long id, long id_perfil, long id_persona, String activo) {
		this.id = id;
		this.id_perfil = id_perfil;
		this.id_persona = id_persona;
		this.activo = activo;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getId_perfil() {
		return id_perfil;
	}
	public void setId_perfil(long id_perfil) {
		this.id_perfil = id_perfil;
	}
	public long getId_persona() {
		return id_persona;
	}
	public void setId_persona(long id_persona) {
		this.id_persona = id_persona;
	}
	public String getActivo() {
		return activo;
	}
	public void setActivo(String activo) {
		this.activo = activo;
	}
	
	
}
