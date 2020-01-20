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
            'transaction_id' => $this->integer()->notNull(),
            'label_id' => $this->integer()->notNull()
        ]);

        $this->addPrimaryKey(
            'pk_transaction_label',
            '{{%transaction_label}}',
            ['transaction_id', 'label_id']);

        $this->addForeignKey(
            'fk_transaction_label_transaction_id',
            '{{%transaction_label}}',
            'transaction_id',
            'transaction',
            'id',
            'CASCADE');

        $this->addForeignKey(
            'fk_transaction_label_label_id',
            '{{%transaction_label}}',
            'label_id',
            'label',
            'id',
            'CASCADE');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk_transaction_label_transaction_id', '{{%transaction_label}}');
        $this->dropForeignKey('fk_transaction_label_label_id', '{{%transaction_label}}');

        $this->dropTable('{{%transaction_label}}');
    }
}
