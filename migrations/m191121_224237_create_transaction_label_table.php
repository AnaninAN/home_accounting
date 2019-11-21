<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%transaction_label}}`.
 */
class m191121_224237_create_transaction_label_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%transaction_label}}', [
            'transaction_id' => $this->primaryKey(),
            'label_id' => $this->integer()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%transaction_label}}');
    }
}
