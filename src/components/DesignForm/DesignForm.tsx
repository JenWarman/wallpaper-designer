import { useState } from "react"
import styles from "./DesignForm.module.scss"

export function DesignForm() {

    const [formData, setFormData] = useState({
        theme: "", motif: "", scale: "", "background-colour": "", repeat: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>)=> {
        console.log(event.target.value)
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    console.log(formData)
    return (
        <div className={styles.designForm__container}>
            <form className={styles.designForm}>
                <label className={styles.designForm__label} htmlFor="theme">Theme</label>
                    <select name="theme" id="theme" className={styles.designForm__select} onChange={handleChange}>
                         <option value=""></option>
                        <option value="floral">Floral</option>
                    </select>
                    <label className={styles.designForm__label} htmlFor="motif">Motif</label>
                    <select name="motif" id="motif"  className={styles.designForm__select} onChange={handleChange}>
                        <option value=""></option>
                        <option value="orchid">Orchid</option>
                        <option value="daisy">Daisy</option>
                        <option value="rose">Rose</option>
                    </select>
                    <label className={styles.designForm__label} htmlFor="scale">Scale</label>
                    <select name="scale" id="scale"  className={styles.designForm__select} onChange={handleChange}>
                        <option value=""></option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                    <label className={styles.designForm__label} htmlFor="background-colour">Background Colour</label>
                    <select name="background-colour" id="background-colour"  className={styles.designForm__select} onChange={handleChange}>
                        <option value=""></option>
                        <option value="pink">Pink</option>
                        <option value="blue">Blue</option>
                    </select>
                    <label className={styles.designForm__label} htmlFor="repeat">Pattern Repeat</label>
                    <select name="repeat" id="repeat"  className={styles.designForm__select} onChange={handleChange}>
                        <option value=""></option>
                        <option value="tile">Tile</option>
                        <option value="half-drop">Half Drop</option>
                    </select>
            </form>
        </div>
    )
}