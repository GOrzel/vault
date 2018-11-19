package com.vault.vault.logic.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by User on 2018-11-19.
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class FileDuplicateException extends RuntimeException{
    public FileDuplicateException(String message) {
        super(message);
    }

    public FileDuplicateException(String message, Throwable cause) {
        super(message, cause);
    }
}