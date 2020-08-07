package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.TagDAO;
import org.example.type.LaptopTagType;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class TagDAOImpl implements TagDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<LaptopTagType> findByLaptopId(Integer laptopId) {
        String query = "SELECT t.tag FROM LaptopTag t WHERE t.laptop.id = :laptopId";
        return em.createQuery(query, LaptopTagType.class).setParameter("laptopId", laptopId).getResultList();
    }
}
