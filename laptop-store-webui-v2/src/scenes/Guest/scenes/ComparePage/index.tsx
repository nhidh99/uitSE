/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import laptopApi from "../../../../services/api/laptopApi";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { SC } from "./styles";
import ProductSpecModel from "../../../../values/models/ProductSpecModel";
import CpuConstants from "../../../../values/constants/CpuConstants";
import ResolutionConstants from "../../../../values/constants/ResolutionConstants";
import BatteryDesignConstants from "../../../../values/constants/BatteryDesignConstants";
import CardDesignConstants from "../../../../values/constants/CardDesignConstants";

type ComparePageState = {
    loading: boolean;
    specs: ProductSpecModel[];
};

const ComparePage = () => {
    // @ts-ignore
    const { id1, id2 } = useParams();
    const INITIAL_STATE: ComparePageState = {
        loading: true,
        specs: [],
    };

    const [state, setState] = useState(INITIAL_STATE);
    const { loading, specs } = state;

    useEffect(() => {
        const loadData = async () => {
            const [res1, res2] = await Promise.all([
                laptopApi.getById(id1),
                laptopApi.getById(id2),
            ]);
            setState({
                specs: [res1.data, res2.data],
                loading: false,
            });
        };
        loadData();
    }, []);

    const data = loading
        ? []
        : [
              {
                  section: "BỘ XỬ LÝ",
                  fields: [
                      {
                          name: "Công nghệ CPU",
                          values: specs.map(
                              (s) =>
                                  `${CpuConstants[s.cpu.type]} ${s.cpu.detail}`
                          ),
                      },
                      {
                          name: "Tốc độ CPU",
                          values: specs.map(
                              (s) => `${s.cpu.speed.toFixed(1)} GHz`
                          ),
                      },
                      {
                          name: "Tốc độ tối đa",
                          values: specs.map((s) => s.cpu.max_speed),
                      },
                  ],
              },
              {
                  section: "RAM - Ổ CỨNG",
                  fields: [
                      {
                          name: "RAM",
                          values: specs.map((s) => `${s.ram.size} GB`),
                      },
                      {
                          name: "Loại RAM",
                          values: specs.map(
                              (s) => `${s.ram.type} ${s.ram.detail}`
                          ),
                      },
                      {
                          name: "Tốc độ Bus RAM",
                          values: specs.map((s) => `${s.ram.bus} MHz`),
                      },
                      {
                          name: "Hỗ trợ RAM tối đa",
                          values: specs.map((s) =>
                              s.ram.max_size
                                  ? `${s.ram.max_size} GB`
                                  : "Không hỗ trợ nâng cấp"
                          ),
                      },
                      {
                          name: "Ổ cứng",
                          values: specs.map((s) =>
                              s.hard_drive.size >= 1024
                                  ? `${s.hard_drive.size / 1024} TB `
                                  : `${s.hard_drive.size} GB ` +
                                    s.hard_drive.detail
                          ),
                      },
                  ],
              },
              {
                  section: "MÀN HÌNH",
                  fields: [
                      {
                          name: "Kích thước màn hình",
                          values: specs.map((s) => `${s.monitor.size} inch`),
                      },
                      {
                          name: "Độ phân giải",
                          values: specs.map((s) => {
                              const m = s.monitor;
                              const type =
                                  ResolutionConstants[m.resolution_type];
                              const width = m.resolution_width;
                              const height = m.resolution_height;
                              return `${type} (${width} x ${height})`;
                          }),
                      },
                      {
                          name: "Công nghệ màn hình",
                          values: specs.map((s) => s.monitor.technology),
                      },
                      {
                          name: "Thiết kế card",
                          values: specs.map(
                              (s) => CardDesignConstants[s.monitor.card_design]
                          ),
                      },
                      {
                          name: "Card đồ họa",
                          values: specs.map((s) => s.monitor.graphics_card),
                      },
                  ],
              },
              {
                  section: "CỔNG KẾT NỐI",
                  fields: [
                      {
                          name: "Cổng giao tiếp",
                          values: specs.map((s) => s.ports),
                      },
                      {
                          name: "Kết nối không dây",
                          values: specs.map((s) => s.wireless),
                      },
                      {
                          name: "Khe đọc thẻ nhớ",
                          values: specs.map(
                              (s) => s?.sd_cards ?? "Không hỗ trợ"
                          ),
                      },
                      {
                          name: "Webcam",
                          values: specs.map((s) => s?.webcam ?? "Không hỗ trợ"),
                      },
                  ],
              },
              {
                  section: "PIN & ADAPTER SẠC",
                  fields: [
                      {
                          name: "Model Adapter sạc",
                          values: specs.map(
                              (s) => s.battery?.adapter ?? "Không"
                          ),
                      },
                      {
                          name: "Loại PIN",
                          values: specs.map(
                              (s) => BatteryDesignConstants[s.battery.type]
                          ),
                      },
                      {
                          name: "Thông tin PIN",
                          values: specs.map((s) => s.battery.detail),
                      },
                  ],
              },
              {
                  section: "THÔNG SỐ KHÁC",
                  fields: [
                      {
                          name: "Công nghệ âm thanh",
                          values: specs.map((s) => s.sound_tech),
                      },
                      {
                          name: "Hệ điều hành",
                          values: specs.map((spec) => spec.os),
                      },
                      {
                          name: "Kích thước",
                          values: specs.map((spec) => spec.size),
                      },
                      {
                          name: "Khối lượng",
                          values: specs.map((spec) => `${spec.weight} kg`),
                      },
                      {
                          name: "Thiết kế",
                          values: specs.map((spec) => spec.design),
                      },
                      {
                          name: "Tính năng khác",
                          values: specs.map((spec) => spec.specials),
                      },
                  ],
              },
          ];

    return loading ? null : (
        <SC.Table>
            <tr>
                <th />
                {specs.map((s) => (
                    <SC.SummaryInfo>
                        <Link
                            to={{
                                pathname: `/products/${s.alt}/${s.id}`,
                                state: { loading: true },
                            }}
                        >
                            <img
                                src={`/api/images/400/laptops/${s.id}/${s.alt}.jpg`}
                                alt={s.name}
                                title={s.name}
                                width={200}
                                height={200}
                            />
                            <br />

                            <SC.ProductName>{s.name}</SC.ProductName>

                            <SC.ProductPrice>
                                {s.unit_price.toLocaleString()}
                                <sup>đ</sup>
                            </SC.ProductPrice>

                            <SC.ProductRating>
                                {" "}
                                - {s.avg_rating.toFixed(1)}{" "}
                                <FaStar color="darkorange" />
                            </SC.ProductRating>
                        </Link>
                    </SC.SummaryInfo>
                ))}
            </tr>

            {data.map((item) => (
                <>
                    <tr>
                        <SC.SpecSection colSpan={specs.length + 1}>
                            {item.section}
                        </SC.SpecSection>
                    </tr>
                    {
                        // @ts-ignore
                        item.fields.map((field) => (
                            <tr>
                                <th>{field.name}</th>
                                {
                                    // @ts-ignore
                                    field.values.map((val) => (
                                        <td>{val}</td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </>
            ))}
        </SC.Table>
    );
};

export default ComparePage;
