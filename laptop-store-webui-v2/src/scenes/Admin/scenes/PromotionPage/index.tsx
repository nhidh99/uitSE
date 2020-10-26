import React, { useMemo } from "react";
import { SC } from "./styles";
import { SSC } from "../../share.styles";
import useTableFetch from "../../../../services/hooks/useTableFetch";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import promotionApi from "../../../../services/api/promotionApi";
import PromotionSummaryModel from "../../../../values/models/PromotionSummaryModel";

const PromotionPage = () => {
    const { list, count, setPage, setTarget } = useTableFetch<PromotionSummaryModel>(
        promotionApi.getByPage,
        {
            target: "id",
            order: "desc",
            page: 1,
        }
    );

    const headers = useMemo(
        () => [
            { name: "Ma khuyen mai", target: "id" },
            { name: "Ten san pham", target: "name" },
            { name: "Hinh anh", target: undefined },
            { name: "So luong", target: "quantity" },
            { name: "Don gia", target: "price" },
        ],
        []
    );

    return (
        <>
            <SSC.SectionTitle>
                Danh sách khuyến mãi
                <div>
                    <button className="delete">
                        <FaTrash /> XOÁ
                    </button>

                    <button className="insert">
                        <FaPlus /> THÊM
                    </button>
                </div>
            </SSC.SectionTitle>

            <SSC.SearchContainer>
                <SSC.SearchInput placeholder="Tìm kiếm theo mã hoặc tên" />
                <SSC.SearchButton>
                    <FaSearch style={{ marginBottom: "-2px", marginRight: "5px" }} />
                    Tim kiem
                </SSC.SearchButton>
            </SSC.SearchContainer>

            <SC.Table>
                <tr>
                    <th>
                        <input type="checkbox" />
                    </th>
                    {headers.map((header) => (
                        <th onClick={header.target ? () => setTarget(header.target) : undefined}>
                            {header.name}
                        </th>
                    ))}
                </tr>

                {list
                    ? list.map((product) => (
                          <tr>
                              <td>
                                  <input type="checkbox" />
                              </td>
                              <td>{product.id}</td>
                              <td>{product.name}</td>
                              <td>
                                  <img
                                      src={product.image_url}
                                      width={40}
                                      height={40}
                                      alt={product.name}
                                  />
                              </td>
                              <td>{product.quantity}</td>
                              <td>{product.price.toLocaleString()}</td>
                          </tr>
                      ))
                    : null}
            </SC.Table>
        </>
    );
};

export default PromotionPage;
