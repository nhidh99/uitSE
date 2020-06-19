package org.example.dao.impl;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.dao.api.AddressDAO;
import org.example.model.Address;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.List;
import java.util.Optional;

@Transactional
@NoArgsConstructor
@AllArgsConstructor
public class AddressDAOImpl implements AddressDAO {

    @PersistenceContext(unitName = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Address> findById(Integer id) {
        Address address = em.find(Address.class, id);
        return Optional.of(address);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Address> findByUserId(Integer userId) {
        String query = "SELECT a FROM Address a WHERE a.recordStatus = true and a.user.id = :userId";
        return em.createQuery(query, Address.class).setParameter("userId", userId).getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Address address) {
        if (address.getId() == null) {
            insert(address);
        } else {
            update(address);
        }
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Address address = em.find(Address.class, id);
        if (address == null) throw new BadRequestException();
        address.setRecordStatus(false);
        em.merge(address);
    }

    private void insert(Address address) {
        em.persist(address);
    }

    private void update(Address address) {
        em.merge(address);
    }
}
