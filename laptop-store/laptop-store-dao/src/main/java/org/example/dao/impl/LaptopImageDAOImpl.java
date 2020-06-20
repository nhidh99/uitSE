package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.LaptopImageDAO;
import org.example.model.LaptopImage;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.List;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class LaptopImageDAOImpl implements LaptopImageDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void update(List<LaptopImage> uploadedImages, List<LaptopImage> deletedImages) {
        uploadedImages.forEach(image -> em.persist(image));
        deletedImages.forEach(image -> em.remove(em.merge(image)));
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        LaptopImage laptopImage = em.find(LaptopImage.class, id);
        if (laptopImage == null) throw new BadRequestException();
        em.remove(laptopImage);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public byte[] findImageById(Integer id) {
        LaptopImage laptopImage = em.find(LaptopImage.class, id);
        if (laptopImage == null) return null;
        return laptopImage.getImage();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Integer> findIdsByLaptopId(Integer laptopId) {
        String query = "SELECT li.id FROM LaptopImage li WHERE li.laptop.id = :laptopId";
        return em.createQuery(query, Integer.class)
                .setParameter("laptopId", laptopId)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<LaptopImage> findByIds(List<Integer> deletedIds) {
        String query = "SELECT li FROM LaptopImage li WHERE li.id IN :deletedIds";
        return em.createQuery(query, LaptopImage.class)
                .setParameter("deletedIds", deletedIds)
                .getResultList();
    }
}
