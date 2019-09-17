import React from "react";
import { Card, Divider, Tag } from "antd";

export default function Weather(props) {
  return (
    <Card
      style={{ margin: "1em" }}
      title={props.date}
      extra={
        <img
          style={{ width: "52px" }}
          src={`http://openweathermap.org/img/wn/${props.weatherIcon}@2x.png`}
          alt="weather icon"
        />
      }
    >
      {!props.current ? null : (
        <div>
          <Tag color="green">current</Tag> {props.temp}℃
        </div>
      )}

      <div>
        <Tag color="blue">min</Tag> {props.tempMin}℃
      </div>

      <div>
        <Tag color="red">max</Tag> {props.tempMax}℃
      </div>

      {!props.pressure ? null : (
        <div>
          <Tag color="purple">pressure</Tag> {props.pressure}hP{" "}
        </div>
      )}

      {!props.humidity ? null : (
        <div>
          <Tag color="gold">humidity</Tag> {props.humidity}%{" "}
        </div>
      )}

      {props.windSpeed && props.windDeg ? (
        <Divider>
          <h4>Wind</h4>
          <div>speed: {props.windSpeed}</div>
          <div>deg: {props.windDeg}</div>
        </Divider>
      ) : null}
    </Card>
  );
}