package com.abbott.magento.exception;

public class CommerceException extends Exception {


        private static final long serialVersionUID = 3013232471823963855L;

       public CommerceException(String message) {
        super(message);
    }
        

        public CommerceException(String message, Throwable throwable) {
          super(message, throwable);
        }

}
