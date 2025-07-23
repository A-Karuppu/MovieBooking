package com.signin.repository;

import com.signin.model.SignupModel;
import org.springframework.data.repository.CrudRepository;

public interface SignupRepository extends CrudRepository<SignupModel, String> {
}
