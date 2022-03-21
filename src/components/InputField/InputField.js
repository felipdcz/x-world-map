import * as styles from './InputField.module.css'

const InputField = ({ register, prefix, ...props }) => {
  return (
    <div className={styles.component}>
      {prefix && (
        <span className={styles.prefix}>{prefix}</span>
      )}
      <input
        className={[styles.input, prefix ? styles.withPrefix : ''].join(' ')}
        {...props}
        {...register}
      />
    </div>
  )
}

export default InputField
