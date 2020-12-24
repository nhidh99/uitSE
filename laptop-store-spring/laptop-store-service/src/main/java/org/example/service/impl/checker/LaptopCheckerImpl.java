package org.example.service.impl.checker;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.LaptopRepository;
import org.example.service.api.checker.LaptopChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LaptopCheckerImpl implements LaptopChecker {
    private final LaptopRepository laptopRepository;

    @Autowired
    public LaptopCheckerImpl(LaptopRepository laptopRepository) {
        this.laptopRepository = laptopRepository;
    }

    @Override
    public void checkExistedLaptop(Integer laptopId) {
        boolean isExistedLaptop = laptopRepository.existsByIdAndRecordStatusTrue(laptopId);
        if (!isExistedLaptop) {
            throw new IllegalArgumentException(ErrorMessageConstants.LAPTOP_NOT_FOUND);
        }
    }
}
