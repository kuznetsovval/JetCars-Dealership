import React from "react";
import styles from "../style/SpecsSection.module.css";

const SpecsSection = ({ engine, performance, weightsColor }) => (
  <div className={styles.SpecsCont}>
    <div className={styles.EngineCont}>
      <div className={styles.EngineText}>Двигун</div>
      <div className={styles.TypeCont}>Тип: {engine.type}</div>
      <div className={styles.CapacityCont}>Об'єм: {engine.capacity}</div>
      <div className={styles.PowerCont}>Потужність: {engine.power}</div>
      <div className={styles.TorqueCont}>Крутний момент: {engine.torque}</div>
    </div>
    <div className={styles.PerformanceCont}>
      <div className={styles.PerformanceText}>Продуктивність</div>
      <div className={styles.FuelCont}>
        Розхід: {performance.fuelConsumption}
      </div>
      <div className={styles.AccelerationCont}>
        Розгін 0-100 км/год: {performance.acceleration}
      </div>
      <div className={styles.SpeedCont}>
        Максимальна швидкість: {performance.maxSpeed}
      </div>
    </div>
    <div className={styles.WeightsColorCont}>
      <div className={styles.WeightsColorText}>Вага та колір</div>
      <div className={styles.WeightCont}>Суха вага: {weightsColor.weight}</div>
      <div className={styles.ColorCont}>Колір: {weightsColor.color}</div>
    </div>
  </div>
);

export default SpecsSection;
